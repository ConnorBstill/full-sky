import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { TID } from "@atproto/common";
import { nanoid } from "nanoid";

import { schemaDict } from "~/lexicon/lexicons";
import * as FullSkyPost from "~/lexicon/types/com/fullsky/post";

import { ResponseBuilder } from "~/lib/response-builder";
import { createClient, getSessionAgent } from "~/lib/auth";
import { db } from "~/server/db";
import { post } from "~/server/db/schema";

import { Post } from "~/server/db/schema";

export const POST = async (req: NextRequest) => {
  try {
    const oauthClient = await createClient();
    const sessionCookies = await cookies();
    const agent = await getSessionAgent(sessionCookies, oauthClient);

    if (!agent) {
      console.error("No session");
      return new NextResponse(ResponseBuilder(null, "Session required", true));
    }

    const { postBody, createdAt, postTitle } = await req.json();

    const rkey = TID.nextStr();

    let uuid;

    while (!uuid) {
      const nanoId = nanoid(6);
      const uuidExists = await db.query.post.findFirst({
        where: (data, { eq }) => eq(data.uuid, nanoId),
      });

      if (!uuidExists) {
        uuid = nanoId;
      }
    }

    const fullskyPostRecord: FullSkyPost.Record = {
      $type: schemaDict.ComFullskyPost.id,
      body: postBody,
      uuid,
      title: postTitle,
      createdAt,
    };

    if (!FullSkyPost.validateRecord(fullskyPostRecord).success) {
      console.error(
        "[ERROR] invalid record",
        FullSkyPost.validateRecord(fullskyPostRecord),
      );
      return new NextRequest(ResponseBuilder(null, "invalid record", true));
    }

    const putRecordRes = await agent.com.atproto.repo.putRecord({
      repo: agent.assertDid,
      collection: schemaDict.ComFullskyPost.id,
      rkey,
      record: fullskyPostRecord,
      validate: false,
    });

    const postUri = putRecordRes.data.uri;
    const now = new Date();

    const newPost: Post = {
      uuid,
      uri: postUri,
      authorDid: agent.did,
      body: postBody,
      title: postTitle,
      createdAt,
      indexedAt: now.toISOString(),
    };

    await db.insert(post).values(newPost);

    return new NextResponse(ResponseBuilder({ postUri }, "success", false));
  } catch (err) {
    console.error("App error in api/oauth/initiate", err);
    return new NextResponse(
      ResponseBuilder(null, "error in POST /api/post", true),
    );
  }
};
