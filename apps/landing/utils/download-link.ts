import { getOs } from '@/utils';

// WIP
// https://github.com/USER/PROJECT/releases/latest/download/package.zip
export const getDownloadLink = (osName: "Mac" | "Windows" | "Linux" | "iOS" | "Android") => {
  const user = "alekseytsvetkov";
  const project = "chronowise";
  const os = osName.toLowerCase();
  const appVersion = "0.0.1";
  const tag = "untagged-2401ad28de66c3606ec0";

  // chronowise.app.tar.gz
  // chronowise_0.0.1_amd64.AppImage
  // chronowise_0.0.1_amd64.deb
  // chronowise_0.0.1_x64.dmg
  // chronowise_0.0.1_x64_en-US.msi

  const filename = {
    mac: `chronowise_${appVersion}_x64.dmg`,
    windows: `chronowise_${appVersion}_x64_en-US.msi`,
    linux: `chronowise_${appVersion}_amd64.AppImage`,
  }[os];

  return `https://github.com/${user}/${project}/releases/download/${tag}/${filename}`;
};