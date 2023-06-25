export type ProgressObject = {
  [key: string]: {
    approved: number;
    total: number;
    translated: number;
  };
};

export type FieldPreferences = {
  locationField: boolean;
  JSONField: boolean;
  dateField: boolean;
  colorField: boolean;
  numberLinkField: boolean;
  SEOField: boolean;
  structuredTextAndBlockField: boolean;
};
