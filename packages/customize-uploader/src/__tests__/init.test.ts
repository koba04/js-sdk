import assert from "assert";
import fs from "fs";
import rimraf from "rimraf";
import { CustomizeManifest } from "../index";
import { generateCustomizeManifest, getInitCustomizeManifest } from "../init";

describe("init", () => {
  const testDestDir = "testDestDir";

  describe("runInit", () => {
    afterEach(() => {
      rimraf.sync(`${testDestDir}`);
    });

    const assertManifestContent = (buffer: Buffer) => {
      const appCustomize = JSON.parse(
        fs
          .readFileSync("src/__tests__/fixtures/get-appcustomize-init.json")
          .toString()
      );
      assert.deepStrictEqual(JSON.parse(buffer.toString()), appCustomize);
    };

    it("should success generating customize-manifest.json", async () => {
      const manifestFile = `${testDestDir}/customize-manifest.json`;
      const manifestFileContent: CustomizeManifest = getInitCustomizeManifest(
        "1",
        "ALL"
      );
      await generateCustomizeManifest(manifestFileContent, testDestDir);
      const content = fs.readFileSync(manifestFile);
      assertManifestContent(content);
      assert.ok(fs.existsSync(manifestFile), `test ${manifestFile} exists`);
    });
  });
});
