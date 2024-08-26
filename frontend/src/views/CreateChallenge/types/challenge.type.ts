import { Metadata } from "../../../types/metadata.type";

export type Technology = {
  id: number;
  name: string;
};

export type Framework = {
  id: number;
  name: string;
  backLang?: Technology;
  frontLang?: Technology;
};

export type ResponseData = {
  metadata: Metadata;
  data: {
    backLangs: Technology[];
    backFrameworks: Framework[];
    frontLangs: Technology[];
    frontFrameworks: Framework[];
    databaseLanguages: Technology[];
  };
};
