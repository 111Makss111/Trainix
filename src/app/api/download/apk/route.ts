import { createReadStream, promises as fs } from "node:fs";
import { resolve } from "node:path";
import { Readable } from "node:stream";

import { NextResponse } from "next/server";

export const runtime = "nodejs";

function getResolvedLocalApkPath() {
  const configuredPath = process.env.TRAINIX_APK_PATH;

  if (!configuredPath) {
    return null;
  }

  return resolve(process.cwd(), configuredPath);
}

export async function GET() {
  const localApkPath = getResolvedLocalApkPath();
  const remoteApkUrl = process.env.TRAINIX_APK_URL;

  if (remoteApkUrl) {
    return NextResponse.redirect(remoteApkUrl, 302);
  }

  if (!localApkPath) {
    return new NextResponse("APK download is not configured.", {
      status: 503,
    });
  }

  try {
    const stats = await fs.stat(localApkPath);
    const stream = createReadStream(localApkPath);

    return new NextResponse(Readable.toWeb(stream) as ReadableStream, {
      headers: {
        "Content-Type": "application/vnd.android.package-archive",
        "Content-Length": String(stats.size),
        "Content-Disposition": `attachment; filename="${process.env.TRAINIX_APK_FILE_NAME ?? "trainix.apk"}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("APK download failed", error);

    return new NextResponse("APK file could not be found.", {
      status: 404,
    });
  }
}
