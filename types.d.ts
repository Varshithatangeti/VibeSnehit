/**
 * Represents an image with different quality options
 */
interface ImageQuality {
  /** Image quality (e.g., '50x50', '150x150', '500x500') */
  quality: string;
  /** Direct URL to the image */
  url: string;
}

/**
 * Represents a download URL with different audio quality options
 */
interface DownloadUrl {
  /** Audio quality (e.g., '12kbps', '48kbps', '96kbps', '160kbps', '320kbps') */
  quality: string;
  /** Direct URL to the audio file */
  url: string;
}

/**
 * Represents album information
 */
interface Album {
  /** Unique album identifier */
  id: string;
  /** Album name */
  name: string;
  /** JioSaavn album URL */
  url: string;
}

/**
 * Represents an artist with their role and metadata
 */
interface Artist {
  /** Unique artist identifier */
  id: string;
  /** Artist name */
  name: string;
  /** Artist role (e.g., 'primary_artists', 'music', 'lyricist') */
  role: string;
  /** Artist images (usually empty array) */
  image: ImageQuality[];
  /** Entity type, always 'artist' */
  type: 'artist';
  /** JioSaavn artist URL */
  url: string;
}

/**
 * Collection of artists categorized by their roles
 */
interface Artists {
  /** Primary performing artists */
  primary: Artist[];
  /** Featured artists */
  featured: Artist[];
  /** All artists including composers, lyricists, etc. */
  all: Artist[];
}

/**
 * Complete song information from JioSaavn API
 */
interface Song {
  /** Unique song identifier */
  id: string;
  /** Song title */
  name: string;
  /** Content type, always 'song' */
  type: 'song';
  /** Release year */
  year: string;
  /** Release date (can be null) */
  releaseDate: string | null;
  /** Song duration in seconds */
  duration: number;
  /** Record label */
  label: string;
  /** Whether song contains explicit content */
  explicitContent: boolean;
  /** Number of times played */
  playCount: number;
  /** Song language */
  language: string;
  /** Whether lyrics are available */
  hasLyrics: boolean;
  /** Lyrics identifier (null if no lyrics) */
  lyricsId: string | null;
  /** JioSaavn song URL */
  url: string;
  /** Copyright information */
  copyright: string;
  /** Album information */
  album: Album;
  /** Artists information */
  artists: Artists;
  /** Song artwork in different sizes */
  image: ImageQuality[];
  /** Download URLs in different audio qualities */
  downloadUrl: DownloadUrl[];
}
