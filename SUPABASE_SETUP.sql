-- SUPABASE SETUP SCRIPT
-- Ejecuta esto en el SQL Editor de Supabase

-- 1. Create users extended table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type TEXT NOT NULL CHECK (user_type IN ('viajero', 'propietario')),
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS for user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for users to read their own profile
CREATE POLICY "Users can read their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

-- Create policy for users to update their own profile
CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create policy for anyone to insert their own profile
CREATE POLICY "Users can insert their own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 2. Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  country TEXT NOT NULL,
  city TEXT,
  address TEXT,
  price DECIMAL(10, 2) NOT NULL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  amenities TEXT[] DEFAULT ARRAY[]::TEXT[],
  rating DECIMAL(3, 2),
  reviews_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS for properties
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Create policy for anyone to read published properties
CREATE POLICY "Anyone can read published properties" ON properties
  FOR SELECT USING (status = 'active');

-- Create policy for owners to read their own properties
CREATE POLICY "Owners can read their own properties" ON properties
  FOR SELECT USING (auth.uid() = owner_id);

-- Create policy for owners to insert properties
CREATE POLICY "Owners can insert properties" ON properties
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- Create policy for owners to update their own properties
CREATE POLICY "Owners can update their own properties" ON properties
  FOR UPDATE USING (auth.uid() = owner_id);

-- Create policy for owners to delete their own properties
CREATE POLICY "Owners can delete their own properties" ON properties
  FOR DELETE USING (auth.uid() = owner_id);

-- Create index on owner_id for faster queries
CREATE INDEX idx_properties_owner_id ON properties(owner_id);
CREATE INDEX idx_properties_country ON properties(country);

-- 3. Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  guest_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS for bookings
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policy for guests to read their own bookings
CREATE POLICY "Guests can read their own bookings" ON bookings
  FOR SELECT USING (auth.uid() = guest_id);

-- Create policy for property owners to read bookings for their properties
CREATE POLICY "Owners can read bookings for their properties" ON bookings
  FOR SELECT USING (
    property_id IN (
      SELECT id FROM properties WHERE owner_id = auth.uid()
    )
  );

-- Create policy for guests to insert bookings
CREATE POLICY "Guests can insert bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = guest_id);

-- Create index on property_id and guest_id
CREATE INDEX idx_bookings_property_id ON bookings(property_id);
CREATE INDEX idx_bookings_guest_id ON bookings(guest_id);

-- 4. Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  guest_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS for reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policy for anyone to read reviews
CREATE POLICY "Anyone can read reviews" ON reviews
  FOR SELECT USING (true);

-- Create policy for guests to insert reviews
CREATE POLICY "Guests can insert reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = guest_id);

-- Create index on property_id
CREATE INDEX idx_reviews_property_id ON reviews(property_id);

-- 5. Create function to update user_profiles on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, user_type, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'viajero'),
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Success message
SELECT 'Supabase setup complete! Tables created and RLS policies applied.' AS status;
