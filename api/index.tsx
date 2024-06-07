import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
import { neynar, type NeynarVariables } from "frog/middlewares";
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/vercel'
import {
  Row,
  Rows,
  Text,
  vars,
  Box,
  VStack,
  HStack,
  Image,
  Divider,
  Spacer,
} from "./ui.js";

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  ui: { vars },
  imageOptions: {
    fonts: [
      {
        name: "JetBrains Mono",
        source: "google",
      },
    ],
    format: 'png',
    //headers: { "Cache-Control": "max-age=3200" },
  },
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

const neynarMiddleware = neynar({
  apiKey: "NEYNAR_FROG_FM",
  features: ["interactor", "cast"],
});


app.frame("/", neynarMiddleware, async (c) => {
  return c.res({
    action: `/score/7LeyTWyhTP9wZeGgcn2bqA`, // HARDCODED HASH
    image: (
      <Box
        grow
        alignHorizontal="left"
        backgroundColor="background"
        padding="34"
      >
        <HStack gap="22">
          <VStack gap="4">
            <Text color="white" size="24" decoration="solid" weight="800">
              Engagement is nice, but
            </Text>
            <Text color="white" size="24" decoration="solid" weight="900">
              what's your real
            </Text>
            <Text color="green" size="24" decoration="solid" weight="900">
              Farcaster Power?
            </Text>
          </VStack>
          <Box
            backgroundColor="background"
            alignHorizontal="right"
            alignVertical="bottom"
            height="256"
            width="192"
            overflow="hidden"
          >
            <Image width="192" height="160" src="/img1.png" />
          </Box>
        </HStack>
      </Box>
    ),
    intents: [<Button value="checkScore">Check your Power Score</Button>,
      <Button value="imageHandlerError" action="/imageHandler">ImageHandler</Button>
    ],
  });
});

app.frame("/score/7LeyTWyhTP9wZeGgcn2bqA", neynarMiddleware, async (c) => {
  console.log(`in the score frame`)
  return c.res({
    image: (
      <Rows gap="1" grow>
        <Row
          backgroundColor="background"
          height="2/5"
          alignContent="center"
          alignItems="center"
          paddingTop="32"
        >
          <Text color="green" size="24" decoration="solid" weight="800">
            Powergame Stats
          </Text>
        </Row>
        <Divider color="green" />
        <Row
          backgroundColor="background"
          height="3/5"
          alignHorizontal="left"
          alignVertical="center"
          padding="16"
        >
          <HStack
            gap="18"
            alignHorizontal="center"
            alignVertical="center"
          >
            <img
              src="https://i.imgur.com/WImxm1D.jpeg"
              width="128"
              height="128"
              style={{
                borderRadius: "0%",
                border: "3.5px solid #B1FC5A",
              }}
            />
            <VStack gap="1">
              <Text
                color="white"
                size="18"
                decoration="solid"
                weight="800"
                wrap="balance"
              >
                ilyaa
              </Text>
              <Text
                color="green"
                size="18"
                decoration="solid"
                weight="800"
              >
                got the power!
              </Text>
            </VStack>
            <Spacer size="72" />
            <Box
              fontSize="18"
              fontFamily="default"
              alignContent="center"
              alignVertical="center"
              paddingBottom="14"
              flexWrap="nowrap"
              display="flex"
            >
              <Text
                color="white"
                size="18"
                decoration="solid"
                weight="800"
                wrap="balance"
              >
                ⚡️sent/received: 12/24
              </Text>
              <Text
                color="white"
                size="18"
                decoration="solid"
                weight="800"
              >
                💰points earned: 1337
              </Text>
              <Text
                color="white"
                size="18"
                decoration="solid"
                weight="800"
              >
                🏆power rank: 1
              </Text>
            </Box>
          </HStack>
        </Row>
        <Divider color="green" />
          {/* <Text color="white" size="20" decoration="solid" weight="800">
            Each ⚡️ sent has points = (sender's Power Score)*10 splitting
            50/50 between sender and receiver
          </Text> */}
          <Box fontSize="20" textAlign="center" fontWeight="800" color="white" backgroundColor="background" paddingTop="36" paddingBottom="30">
            Each ⚡️ sent has points = (sender's Power Score)*10 splitting
            50/50 between sender and receiver
          </Box>
      </Rows>
    ),
    intents: [
      <Button.Link href="https://google.com">Share</Button.Link>,
      <Button value="checkScore">Refresh</Button>,
      <Button value="joinGame" action="/">
        Back
      </Button>,
    ],
  });
});

app.frame("/imageHandler", neynarMiddleware, async (c) => {
  return c.res({
    image: '/img',
    intents: [
      <Button.Link href="https://google.com">Share</Button.Link>,
      <Button value="checkScore">Refresh</Button>,
      <Button value="joinGame" action="/">
        Back
      </Button>,
    ],
  })

});

app.image('/img', (c) => {
  return c.res({
    image: (
      <Box
        grow
        alignHorizontal="left"
        backgroundColor="background"
        padding="34"
      >
        <HStack gap="22">
          <VStack gap="4">
            <Text color="white" size="24" decoration="solid" weight="800">
              Engagement is nice, but
            </Text>
            <Text color="white" size="24" decoration="solid" weight="900">
              what's your real
            </Text>
            <Text color="green" size="24" decoration="solid" weight="900">
              Farcaster Power?
            </Text>
          </VStack>
          <Box
            backgroundColor="background"
            alignHorizontal="right"
            alignVertical="bottom"
            height="256"
            width="192"
            overflow="hidden"
          >
            <Image width="192" height="160" src="/img1.png" />
          </Box>
        </HStack>
      </Box>
    )
  })
})


// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined'
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development'
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
