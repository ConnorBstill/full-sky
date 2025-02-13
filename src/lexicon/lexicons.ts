/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { LexiconDoc, Lexicons } from "@atproto/lexicon";

export const schemaDict = {
  AppBskyActorProfile: {
    lexicon: 1,
    id: "app.bsky.actor.profile",
    defs: {
      main: {
        type: "record",
        description: "A declaration of a Bluesky account profile.",
        key: "literal:self",
        record: {
          type: "object",
          properties: {
            displayName: {
              type: "string",
              maxGraphemes: 64,
              maxLength: 640,
            },
            description: {
              type: "string",
              description: "Free-form profile description text.",
              maxGraphemes: 256,
              maxLength: 2560,
            },
            avatar: {
              type: "blob",
              description:
                "Small image to be displayed next to posts from account. AKA, 'profile picture'",
              accept: ["image/png", "image/jpeg"],
              maxSize: 1000000,
            },
            banner: {
              type: "blob",
              description:
                "Larger horizontal image to display behind profile view.",
              accept: ["image/png", "image/jpeg"],
              maxSize: 1000000,
            },
            labels: {
              type: "union",
              description:
                "Self-label values, specific to the Bluesky application, on the overall account.",
              refs: ["lex:com.atproto.label.defs#selfLabels"],
            },
            joinedViaStarterPack: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef",
            },
            pinnedPost: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef",
            },
            createdAt: {
              type: "string",
              format: "datetime",
            },
          },
        },
      },
    },
  },
  ComFullskyPost: {
    lexicon: 1,
    id: "com.fullsky.post",
    defs: {
      main: {
        type: "record",
        key: "tid",
        record: {
          type: "object",
          required: ["body", "createdAt"],
          properties: {
            body: {
              type: "string",
              minLength: 1,
              maxGraphemes: 30000,
              maxLength: 30000,
            },
            embed: {
              type: "union",
              refs: [
                "lex:app.bsky.embed.images",
                "lex:app.bsky.embed.video",
                "lex:app.bsky.embed.external",
                "lex:app.bsky.embed.record",
                "lex:app.bsky.embed.recordWithMedia",
              ],
            },
            langs: {
              type: "array",
              description:
                "Indicates human language of post primary text content.",
              maxLength: 3,
              items: {
                type: "string",
                format: "language",
              },
            },
            labels: {
              type: "union",
              description:
                "Self-label values for this post. Effectively content warnings.",
              refs: ["lex:com.atproto.label.defs#selfLabels"],
            },
            tags: {
              type: "array",
              description:
                "Additional hashtags, in addition to any included in post text and facets.",
              maxLength: 8,
              items: {
                type: "string",
                maxLength: 640,
                maxGraphemes: 64,
              },
            },
            createdAt: {
              type: "string",
              format: "datetime",
            },
          },
        },
      },
    },
  },
} as const satisfies Record<string, LexiconDoc>;

export const schemas = Object.values(schemaDict);
export const lexicons: Lexicons = new Lexicons(schemas);
export const ids = {
  AppBskyActorProfile: "app.bsky.actor.profile",
  ComFullskyPost: "com.fullsky.post",
};
