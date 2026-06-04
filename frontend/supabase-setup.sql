CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  terms_accepted_at timestamptz NOT NULL,
  topics text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password text NOT NULL
);

INSERT INTO admins (username, password) VALUES ('admin', 'admin123');

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon insert" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon select" ON users FOR SELECT USING (true);
CREATE POLICY "Allow anon update" ON users FOR UPDATE USING (true);
CREATE POLICY "Allow anon select admins" ON admins FOR SELECT USING (true);
