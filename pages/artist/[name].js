import Layout from "@c/Layout";
import FlexyRow from "@c/FlexyRow";
import { Markdown, ArtistName, Portrait } from "@c/Artist";
import { getArtistByName } from "@l/graphcms";
import { formatUrl } from "@l/utils";

export default function Artist({ artist }) {
  return (
    <Layout
      title={`Artist / ${artist.fullName}`}
      maxWidth="900px"
      padding="0 2em"
    >
      <ArtistName>{artist.fullName}</ArtistName>

      <Portrait images={artist.images} />

      <FlexyRow justify="flex-start">
        {artist.webUrl && (
          <a href={formatUrl(artist.webUrl)} target="_blank">
            Website
          </a>
        )}
        {artist.facebookUrl && (
          <a href={formatUrl(artist.facebookUrl)} target="_blank">
            Facebook
          </a>
        )}
        {artist.instagramUrl && (
          <a href={formatUrl(artist.instagramUrl)} target="_blank">
            Instagram
          </a>
        )}
        {artist.youTubeUrl && (
          <a href={formatUrl(artist.youTubeUrl)} target="_blank">
            YouTube
          </a>
        )}
        {artist.spotifyUrl && (
          <a href={formatUrl(artist.spotifyUrl)} target="_blank">
            Spotify
          </a>
        )}
      </FlexyRow>

      <Markdown source={artist.bio} />
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { name } = params;
  const artist = await getArtistByName(name);

  if (artist) {
    return {
      props: { artist },
    };
  } else {
    // Throw a 404
    return {
      notFound: true,
    };
  }
}
