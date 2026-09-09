import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import url from 'url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

// 1. Manually parse .env.local
const envPath = path.join(__dirname, '.env.local')
const envContent = fs.readFileSync(envPath, 'utf8')
const env = {}
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/)
  if (match) {
    env[match[1].trim()] = match[2].trim()
  }
})

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL']
const supabaseKey = env['NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY']

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or Key is missing in .env.local')
}

const supabase = createClient(supabaseUrl, supabaseKey)

// 2. Parse Folder Name Function
function parseCarDetails(folderName) {
  let make = 'Unknown'
  let model = 'Unknown'
  let year = 2020
  let price_ngn = 0
  let condition = 'Foreign Used'

  if (folderName.includes('Lexus_2014_Model_25_Million_RX_350')) {
    return {
      make: 'Lexus',
      model: 'RX 350',
      year: 2014,
      price_ngn: 25000000,
      condition: 'Foreign Used',
      body_type: 'SUV'
    }
  }

  // Standard format: Mercedes-Benz GLS 450 (2025, Foreign-Used) — ₦240M
  // or Lexus ES 350 (Foreign-Used, 2015) — ₦20M
  const makeModelMatch = folderName.match(/^([A-Za-z\-]+)\s+(.+?)\s+\(/)
  if (makeModelMatch) {
    make = makeModelMatch[1]
    model = makeModelMatch[2]
  } else {
    // Fallback if no parentheses
    const parts = folderName.split(' ')
    make = parts[0]
    model = parts.slice(1, 3).join(' ')
  }

  const yearMatch = folderName.match(/(20\d{2})/)
  if (yearMatch) {
    year = parseInt(yearMatch[1], 10)
  }

  const priceMatch = folderName.match(/₦([\d\.]+)M/)
  if (priceMatch) {
    price_ngn = parseFloat(priceMatch[1]) * 1000000
  }

  if (folderName.toLowerCase().includes('brand new') || folderName.toLowerCase().includes('brand-new')) {
    condition = 'Brand New'
  }

  let body_type = 'Sedan'
  if (model.includes('RX') || model.includes('GLS') || model.includes('GLE') || model.includes('GLC') || model.includes('Venza')) {
    body_type = 'SUV'
  }

  return { make, model, year, price_ngn, condition, body_type }
}

async function run() {
  console.log('Logging into Supabase as Admin...')
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'info.ephraimautos@gmail.com',
    password: 'Ephraim1#' // From earlier chat
  })

  if (authError) {
    console.error('Failed to log in! RLS will block inserts without admin access.', authError)
    process.exit(1)
  }
  console.log('Logged in successfully! Processing folders...')

  const carsDir = path.join(__dirname, 'Ephraim Autos Available Cars')
  const folders = fs.readdirSync(carsDir).filter(f => fs.statSync(path.join(carsDir, f)).isDirectory())

  for (const folder of folders) {
    console.log(`\n============================`)
    console.log(`Processing: ${folder}`)
    const details = parseCarDetails(folder)
    console.log('Parsed:', details)

    const folderPath = path.join(carsDir, folder)
    const files = fs.readdirSync(folderPath).filter(f => /\.(jpg|jpeg|png|webp|heic|JPG|JPEG|PNG)$/.test(f))
    
    if (files.length === 0) {
      console.log(`No images found in ${folder}, skipping...`)
      continue
    }

    const uploadedUrls = []

    for (const file of files) {
      const filePath = path.join(folderPath, file)
      const fileBuffer = fs.readFileSync(filePath)
      const fileExt = path.extname(file)
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}${fileExt}`
      
      console.log(`Uploading ${file}...`)
      const { data, error } = await supabase.storage
        .from('cars')
        .upload(fileName, fileBuffer, {
          contentType: `image/${fileExt.replace('.', '').replace('jpg', 'jpeg')}`
        })

      if (error) {
        console.error(`Failed to upload ${file}:`, error)
      } else {
        const { data: { publicUrl } } = supabase.storage.from('cars').getPublicUrl(fileName)
        uploadedUrls.push(publicUrl)
      }
    }

    if (uploadedUrls.length > 0) {
      console.log(`Saving ${details.make} ${details.model} to database with ${uploadedUrls.length} images...`)
      const { error: dbError } = await supabase.from('cars').insert({
        make: details.make,
        model: details.model,
        year: details.year,
        price_ngn: details.price_ngn,
        price_usd: Math.round(details.price_ngn / 1400),
        mileage_type: details.condition,
        body_type: details.body_type,
        images: uploadedUrls,
        status: 'Available'
      })

      if (dbError) {
        console.error('Failed to save to database:', dbError)
      } else {
        console.log('Successfully saved!')
      }
    }
  }

  console.log('\n============================')
  console.log('BULK IMPORT COMPLETE!')
}

run()
