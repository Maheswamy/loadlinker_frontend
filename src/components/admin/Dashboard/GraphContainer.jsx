import React from "react";
import { BarChart, LineChart, PieChart, ColumnChart } from "react-chartkick";
import "chartkick/chart.js";
import { useSelector } from "react-redux";
import { Stack, Typography, Container, Box } from "@mui/material";

const color = ["#ffb399", "#ff6633"];

const GraphContainer = () => {
  const { info } = useSelector((state) => state.analysis);

  return (
    <Container>
      <Stack spacing={3}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent={"space-between"}
          alignItems={"center"}
          spacing={4}
        >
          <Box>
            <BarChart data={info.users} colors={color} />
            <Typography variant="subtitle1" color="text" align="center">
              User Registration
            </Typography>
          </Box>
          <Box>
            <PieChart
              donut={true}
              data={info.perMonthShipment}
              colors={color}
              legend={true}
            />
            <Typography variant="subtitle1" color="text" align="center">
              Shipments Per Month
            </Typography>
          </Box>
          <Box>
            <PieChart
              donut={true}
              data={info.shipments}
              colors={color}
              legend={true}
            />
            <Typography variant="subtitle1" color="text" align="center">
              Shipments Present Condition
            </Typography>
          </Box>
        </Stack>
        <Box>
          <ColumnChart
            data={info.dateWiseRevenue}
            curve={false}
            colors={["#ff6633"]}
            vertical={true}
          />
          <Typography variant="subtitle1" color="text" align="center">
            Revenue Per Day
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};

export default GraphContainer;
