-- Add transcript caching fields to videos table
-- Execute this via Supabase dashboard or API

ALTER TABLE videos ADD COLUMN IF NOT EXISTS transcript TEXT;
ALTER TABLE videos ADD COLUMN IF NOT EXISTS transcript_fetched_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE videos ADD COLUMN IF NOT EXISTS transcript_error TEXT;

-- Add index for transcript_fetched_at for cache expiration queries
CREATE INDEX IF NOT EXISTS idx_videos_transcript_fetched_at ON videos(transcript_fetched_at);

-- Comments for documentation
COMMENT ON COLUMN videos.transcript IS 'YouTube transcript content (auto-generated captions)';
COMMENT ON COLUMN videos.transcript_fetched_at IS 'When transcript was last fetched from YouTube';
COMMENT ON COLUMN videos.transcript_error IS 'Error message if transcript fetch failed';