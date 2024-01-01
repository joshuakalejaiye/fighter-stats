
interface Game {
  id: string
  accolade?: string
  image: string,
  name: string
  developers: string,
  playerCount: number
  playerCountTitle: string
  releaseDate: { coming_soon: boolean; date: string }
  link?: string
}

type SteamGameResponse = Record<string, { success: boolean, data: GameData}>

interface GameData {
  type: string;
  name: string;
  steam_appid: number;
  required_age: number;
  is_free: boolean;
  dlc: number[];
  detailed_description: string;
  about_the_game: string;
  short_description: string;
  supported_languages: string;
  header_image: string;
  capsule_image: string;
  capsule_imagev5: string;
  website: string;
  pc_requirements: Requirements;
  mac_requirements: Requirements;
  linux_requirements: Requirements;
  legal_notice: string;
  drm_notice: string;
  ext_user_account_notice: string;
  developers: string[];
  publishers: string[];
  demos: Demo[];
  price_overview: PriceOverview;
  packages: number[];
  package_groups: PackageGroup[];
  platforms: Platforms;
  metacritic: Metacritic;
  categories: Category[];
  genres: Genre[];
  screenshots: Screenshot[];
  movies: Movie[];
  recommendations: {
    total: number;
  };
  achievements: Achievements;
  release_date: {
    coming_soon: boolean;
    date: string;
  };
  support_info: {
    url: string;
    email: string;
  };
  background: string;
  background_raw: string;
  content_descriptors: {
    ids: number[];
    notes: string | null;
  };
}

interface PlayerCountResponse {
  response: {
    player_count: number,
    result: number
  }
}