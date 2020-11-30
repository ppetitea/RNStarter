import { AppConfig } from "../../config/config";
import Config from "../models/App/Config";
import Logger from "../models/Logger/Logger";

export const config = Config(AppConfig);
export const log = Logger({ appConfig: config });
