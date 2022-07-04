import { useState } from "react";
import Layout from "@c/Layout";
import { Grid, Card } from "@c/Grid";
import { Title } from "@c/Title";
import { Toggle } from "@c/Toggle";
import { formatUSD, formatDate } from "@l/utils";
import { getAllShows } from "@l/graphcms";

export default function Shows({ shows }) {
  const [listType, setListType] = useState("grid");
  const isList = listType === "list";

  return (
    <Layout width={isList && "100%"} title="next-graphcms-shows / Shows">
      <Title>Shows</Title>
      <Toggle
        toggled={isList}
        onToggle={() => setListType(isList ? "grid" : "list")}
      />
      <Grid listType={listType}>
        {shows.map((show) => (
          <Card href={`/show/${show.slug}`} header={show.title} key={show.id}>
            <p>{show.artists.map(({ fullName }) => fullName).join(", ")}</p>
            {isList && (
              <>
                <p>Price: {formatUSD(show.ticketPrice)}</p>
                <p>{formatDate(show.scheduledStartTime)}</p>
              </>
            )}
          </Card>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps() {
  const shows = (await getAllShows()) || [];
  return {
    props: { shows },
  };
}
