-- Create the 'cars' table
CREATE TABLE cars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price_ngn BIGINT NOT NULL,
  price_usd INTEGER NOT NULL,
  mileage_type TEXT NOT NULL CHECK (mileage_type IN ('Brand New', 'Foreign Used')),
  body_type TEXT NOT NULL,
  images TEXT[] NOT NULL,
  status TEXT DEFAULT 'Available' CHECK (status IN ('Available', 'Pending Sale', 'Sold')),
  description TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anyone to read from the cars table
CREATE POLICY "Allow public read access on cars"
ON cars
FOR SELECT
TO public
USING (true);
