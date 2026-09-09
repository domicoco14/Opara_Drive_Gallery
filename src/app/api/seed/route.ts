import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  // Verify authentication
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized. Please log in to the admin dashboard first.' }, { status: 401 })
  }

  const mockCars = [
    {
      make: "Mercedes-Benz",
      model: "G63 AMG",
      year: 2023,
      price_ngn: 250000000,
      price_usd: 180000,
      mileage_type: "Brand New",
      body_type: "SUV",
      images: ["https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1000&auto=format&fit=crop"],
      status: "Available",
    },
    {
      make: "Land Rover",
      model: "Range Rover Vogue",
      year: 2022,
      price_ngn: 180000000,
      price_usd: 130000,
      mileage_type: "Foreign Used",
      body_type: "SUV",
      images: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=1000&auto=format&fit=crop"],
      status: "Available",
    },
    {
      make: "Lexus",
      model: "LX 600",
      year: 2024,
      price_ngn: 300000000,
      price_usd: 210000,
      mileage_type: "Brand New",
      body_type: "SUV",
      images: ["https://images.unsplash.com/photo-1623869675781-80aa31012a5a?q=80&w=1000&auto=format&fit=crop"],
      status: "Available",
    },
    {
      make: "Toyota",
      model: "Camry XSE",
      year: 2021,
      price_ngn: 35000000,
      price_usd: 25000,
      mileage_type: "Foreign Used",
      body_type: "Sedan",
      images: ["https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?q=80&w=1000&auto=format&fit=crop"],
      status: "Available",
    },
    {
      make: "Mercedes-Benz",
      model: "GLE 450",
      year: 2023,
      price_ngn: 120000000,
      price_usd: 85000,
      mileage_type: "Foreign Used",
      body_type: "SUV",
      images: ["https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1000&auto=format&fit=crop"],
      status: "Available",
    }
  ]

  const { data, error } = await supabase.from('cars').insert(mockCars)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ 
    success: true, 
    message: `Successfully seeded ${mockCars.length} cars to the database! You can now check the Inventory in the Admin Dashboard or Homepage.`
  })
}
