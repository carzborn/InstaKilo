import { Container, Image, Avatar, Text, Card } from "@mantine/core";

const Grid = ({ imageUrl, profilePic, username }) => {
  return (
    <Container fluid="fluid" align="center" mt="xl" mb="xl">
      <Card
        shadow="md"
        radius="sm"
        sx={{
          maxWidth: 500,
        }}
      >
        <Card.Section p={10} align="start">
          <Text
            weight={500}
            size="sm"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Avatar radius="xl" src={profilePic} color="blue" mr="md" />
            <strong>{username}</strong>
          </Text>
        </Card.Section>

        <Card.Section>
          <Image
            src={imageUrl}
            alt="An InstaKilo post!"
            fit="contain"
            width="100%"
            withPlaceholder="withPlaceholder"
          />
        </Card.Section>
      </Card>
    </Container>
  );
};

export default Grid;
