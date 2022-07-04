import { useState, useEffect } from "react";
import Layout from "@c/Layout";
import { Grid, Card } from "@c/Grid";
import { Title } from "@c/Title";
import { ToggleWithTitles } from "@c/Toggle";
import FlexyRow from "@c/FlexyRow";
import { SelectWithTitle } from "@c/Select";
import { formatUSD, formatDate } from "@l/utils";
import { getAllShows } from "@l/graphcms";

const sortOrders = [
  {
    id: "title_ASC",
    text: "Title - asc",
  },
  {
    id: "title_DESC",
    text: "Title desc - desc",
  },
  {
    id: "scheduledStartTime_ASC",
    text: "Scheduled Date - asc",
  },
  {
    id: "scheduledStartTime_DESC",
    text: "Scheduled Date - desc",
  },
];

export default function Shows() {
  const [listType, setListType] = useState("grid");
  const [sortOrder, setSortOrder] = useState(sortOrders[3].text);
  const [shows, setShows] = useState([]);
  const isList = listType === "list";

  const handleSelectChange = ({ target: { value } }) => {
    setSortOrder(value);
  };

  const loadShows = async () => {
    const orderId = sortOrders.find(({ text }) => text === sortOrder).id;
    const res = (await getAllShows(orderId)) || [];
    setShows(res);
  };

  useEffect(() => {
    loadShows();
  }, [sortOrder]);

  return (
    <Layout
      maxWidth="1000px"
      width={isList && "100%"}
      title="next-graphcms-shows / Shows"
    >
      <Title>Shows</Title>
      <FlexyRow justify="space-around">
        <ToggleWithTitles
          toggled={isList}
          onToggle={() => setListType(isList ? "grid" : "list")}
          start="Grid"
          end="List"
        />
        <SelectWithTitle
          title="Sort Order"
          data={sortOrders}
          value={sortOrder}
          onChange={handleSelectChange}
        />
      </FlexyRow>
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
