import {
  ChakraProvider,
  Heading,
  Container,
  Text,
  Input,
  Button,
  Wrap,
  Stack, 
  Image,
  Link,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [image, updateImage] = useState();
  const [prompt, updatePrompt] = useState();
  const [loading, updateLoading] = useState();

  const generate = async (prompt) => {
    updateLoading(true);
    const result = await axios.get(`https://4c12-83-243-172-53.eu.ngrok.io/?prompt=${prompt}`);
    updateImage(result.data);
    updateLoading(false);
  };
  return (
     <ChakraProvider>
      <Container>
        <Heading>Stable Diffusion Image Generation App </Heading>
        <Text marginBottom={"10px"}>
          <code>Hi,🤗This is swapnil,  I want to test this concept that I am working with , Help me by using it as much as possible </code>
           Enter a short description of whatever you want to see in your Image and hit Generate
          USE IT WITH CAUTION. Try again if doesnt work in the first try. Feel free to use the images you generate.
        </Text>

        <Wrap marginBottom={"10px"}>
          <Input
            value={prompt}
            onChange={(e) => updatePrompt(e.target.value)}
            width={"350px"}
          ></Input>
          <Button onClick={(e) => generate(prompt)} colorScheme={"yellow"}>
            Generate
          </Button>
        </Wrap>

        {loading ? (
          <Stack>
            <SkeletonCircle />
            <SkeletonText />
          </Stack>
        ) : image ? (
          <Image src={`data:image/png;base64,${image}`} boxShadow="lg" />
        ) : null}
      </Container>
    </ChakraProvider>
  )
}
