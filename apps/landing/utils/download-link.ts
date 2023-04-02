import version from '@chronowise/desktop/package.json'

export const getDownloadLink = (osName: "Mac" | "Windows" | "Linux" | "iOS" | "Android") => {
  const user = "alekseytsvetkov";
  const project = "chronowise";
  const os = osName.toLowerCase();

  // chronowise_0.0.1_amd64.AppImage
  // chronowise_0.0.1_amd64.deb
  // chronowise_0.0.1_x64.dmg
  // chronowise_0.0.1_x64_en-US.msi

  const filename = {
    mac: `chronowise_${version}_x64.dmg`,
    windows: `chronowise_${version}_x64_en-US.msi`,
    linux: `chronowise_${version}_amd64.AppImage`,
  }[os];

  return `https://github.com/${user}/${project}/releases/latest/download/${filename}`;
};