import fs from "fs";
import { promisify } from "util";
import { basename } from "path";
import { UnsupportedPlatformError } from "./UnsupportedPlatformError";
import https from "https";

const readFile = promisify(fs.readFile);

export const readFileFromPath = async (filePath: string) => {
  const data = await readFile(filePath);
  const name = basename(filePath);
  return { data, name };
};

export const getRequestToken = () => {
  throw new UnsupportedPlatformError("Node.js");
};

export const buildPlatformDependentConfig = (params: {
  clientCertAuth?:
    | {
        pfx: Buffer;
        password: string;
      }
    | {
        pfxFilePath: string;
        password: string;
      };
}) => {
  const clientCertAuth = params.clientCertAuth;

  if (clientCertAuth) {
    const pfx =
      "pfx" in clientCertAuth
        ? clientCertAuth.pfx
        : fs.readFileSync(clientCertAuth.pfxFilePath);
    const httpsAgent = new https.Agent({
      pfx,
      passphrase: clientCertAuth.password,
    });
    return { httpsAgent };
  }
  return {};
};
