import Link from "next/link";
import Layout from "@c/Layout";
import FlexyRow from "@c/FlexyRow";
import { Title } from "@c/Title";
import { Markdown, ArtistName, Portrait } from "@c/Artist";
import { getShowBySlug } from "@l/graphcms";
import { formatUSD, formatDate } from "@l/utils";

export default function Shows({ show }) {
  return (
    <Layout
      title={`${show.title} / next-graphcms-shows`}
      maxWidth="900px"
      padding="0 2em"
    >
      <Title>{show.title}</Title>

      <FlexyRow>
        <span>Price: {formatUSD(show.ticketPrice)}</span>
        <span>{formatDate(show.scheduledStartTime)}</span>
      </FlexyRow>

      <Markdown source={show.description} />

      {show.artists.map((artist) => (
        <Link href={`/artist/${artist.slug}`} passHref>
          <a>
            <ArtistName>{artist.fullName}</ArtistName>

            <Portrait images={artist.images} />
          </a>
        </Link>
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const show = await getShowBySlug(slug);

  if (show) {
    return {
      props: { show },
    };
  } else {
    return {
      notFound: true,
    };
  }
}
