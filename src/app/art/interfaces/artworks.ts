export interface SearchResponse {
  pagination: Pagination;
  data:       Artworks[];
  info:       Info;
  config:     Config;
}

export interface Config {
  iiif_url:    string;
  website_url: string;
}

export interface Artworks {
  id:                            number;
  api_model:                     APIModel;
  api_link:                      string;
  is_boosted:                    boolean;
  title:                         string;
  alt_titles:                    null;
  thumbnail:                     Thumbnail;
  main_reference_number:         string;
  has_not_been_viewed_much:      boolean;
  boost_rank:                    null;
  date_start:                    number;
  date_end:                      number;
  date_display:                  DateDisplay;
  date_qualifier_title:          string;
  date_qualifier_id:             null;
  artist_display:                string;
  place_of_origin:               PlaceOfOrigin;
  description:                   null | string;
  short_description:             null;
  dimensions:                    string;
  dimensions_detail:             DimensionsDetail[];
  medium_display:                MediumDisplay;
  inscriptions:                  null;
  credit_line:                   CreditLine;
  catalogue_display:             null;
  publication_history:           null;
  exhibition_history:            null;
  provenance_text:               null;
  edition:                       null;
  publishing_verification_level: PublishingVerificationLevel;
  internal_department_id:        number;
  fiscal_year:                   number;
  fiscal_year_deaccession:       null;
  is_public_domain:              boolean;
  is_zoomable:                   boolean;
  max_zoom_window_size:          number;
  copyright_notice:              null;
  has_multimedia_resources:      boolean;
  has_educational_resources:     boolean;
  has_advanced_imaging:          boolean;
  colorfulness:                  number;
  color:                         Color;
  latitude:                      null;
  longitude:                     null;
  latlon:                        null;
  is_on_view:                    boolean;
  on_loan_display:               null;
  gallery_title:                 GalleryTitle;
  gallery_id:                    number;
  nomisma_id:                    null;
  artwork_type_title:            ArtworkTypeTitle;
  artwork_type_id:               number;
  department_title:              DepartmentTitleElement;
  department_id:                 ID;
  artist_id:                     number;
  artist_title:                  ArtistTitle;
  alt_artist_ids:                any[];
  artist_ids:                    number[];
  artist_titles:                 ArtistTitle[];
  category_ids:                  ID[];
  category_titles:               DepartmentTitleElement[];
  term_titles:                   ClassificationTitleEnum[];
  style_id:                      StyleID | null;
  style_title:                   ClassificationTitleEnum | null;
  alt_style_ids:                 any[];
  style_ids:                     StyleID[];
  style_titles:                  ClassificationTitleEnum[];
  classification_id:             ClassificationID;
  classification_title:          ClassificationTitleEnum;
  alt_classification_ids:        ClassificationID[];
  classification_ids:            ClassificationID[];
  classification_titles:         ClassificationTitleEnum[];
  subject_id:                    null;
  alt_subject_ids:               any[];
  subject_ids:                   any[];
  subject_titles:                any[];
  material_id:                   MaterialID;
  alt_material_ids:              MaterialID[];
  material_ids:                  MaterialID[];
  material_titles:               ClassificationTitleEnum[];
  technique_id:                  null;
  alt_technique_ids:             any[];
  technique_ids:                 any[];
  technique_titles:              any[];
  theme_titles:                  any[];
  image_id:                      string;
  alt_image_ids:                 string[];
  document_ids:                  any[];
  sound_ids:                     any[];
  video_ids:                     any[];
  text_ids:                      any[];
  section_ids:                   any[];
  section_titles:                any[];
  site_ids:                      any[];
  suggest_autocomplete_all:      SuggestAutocompleteAll[];
  source_updated_at:             Date;
  updated_at:                    Date;
  timestamp:                     Date;
}

export enum ClassificationID {
  Tm13 = "TM-13",
  Tm1394 = "TM-1394",
  Tm38 = "TM-38",
  Tm46 = "TM-46",
}

export enum MaterialID {
  Tm2432 = "TM-2432",
  Tm2448 = "TM-2448",
  Tm2457 = "TM-2457",
  Tm2600 = "TM-2600",
}

export enum APIModel {
  Artworks = "artworks",
}

export enum ArtistTitle {
  MeissenPorcelainManufactory = "Meissen Porcelain Manufactory",
}

export enum ArtworkTypeTitle {
  Ceramics = "Ceramics",
}

export enum ID {
  PC9 = "PC-9",
}

export enum DepartmentTitleElement {
  AppliedArtsOfEurope = "Applied Arts of Europe",
}

export enum ClassificationTitleEnum {
  Ceramic = "ceramic",
  Ceramics = "ceramics",
  EuropeanDecorativeArts = "european decorative arts",
  HardPastePorcelain = "hard-paste porcelain",
  InorganicMaterial = "inorganic material",
  Porcelain = "porcelain",
  Rococo = "Rococo",
  Sculpture = "sculpture",
}

export interface Color {
  h:          number;
  l:          number;
  s:          number;
  percentage: number;
  population: number;
}

export enum CreditLine {
  GiftOfRobertAllerton = "Gift of Robert Allerton",
}

export enum DateDisplay {
  C1765 = "c. 1765",
}

export interface DimensionsDetail {
  depth:         null;
  width:         null;
  height:        number;
  diameter:      null;
  clarification: null;
}

export enum GalleryTitle {
  Gallery234 = "Gallery 234",
}

export enum MediumDisplay {
  HardPastePorcelainPolychromeEnamelsAndGilding = "Hard-paste porcelain, polychrome enamels, and gilding",
  HardPastePorcelainPolychromeEnamelsAndgilding = "Hard-paste porcelain, polychrome enamels, andgilding",
}

export enum PlaceOfOrigin {
  Meissen = "Meissen",
}

export enum PublishingVerificationLevel {
  WebBasic = "Web Basic",
}

export enum StyleID {
  Tm5895 = "TM-5895",
}

export interface SuggestAutocompleteAll {
  input:    string[];
  contexts: Contexts;
  weight?:  number;
}

export interface Contexts {
  groupings: Grouping[];
}

export enum Grouping {
  Accession = "accession",
  Title = "title",
}

export interface Thumbnail {
  lqip:     string;
  width:    number;
  height:   number;
  alt_text: string;
}

export interface Info {
  license_text:  string;
  license_links: string[];
  version:       string;
}

export interface Pagination {
  total:        number;
  limit:        number;
  offset:       number;
  total_pages:  number;
  current_page: number;
  next_url:     string;
}
