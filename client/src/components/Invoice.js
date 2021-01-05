import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";
import { formatRupiah } from "../functions/product";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  footer: {
    padding: "100px",
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const Invoice = ({ order }) => {
  return (
    <Document>
      <Page style={styles.body} size="A4">
        <View>
          <Text style={styles.title}>{new Date().toLocaleString()}</Text>
          <Text style={styles.title}>Order Invoice</Text>
          <Text style={styles.author}>TechShop</Text>
          <Text style={styles.subtitle}>Order Summary</Text>

          <Table>
            <TableHeader>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Color</TableCell>
            </TableHeader>
          </Table>
          <Table>
            <TableBody data={order.products}>
              <DataTableCell getContent={(x) => x.product.title} />
              <DataTableCell
                getContent={(x) => formatRupiah(x.product.price)}
              />
              <DataTableCell getContent={(x) => x.count} />
              <DataTableCell getContent={(x) => x.product.brand} />
              <DataTableCell getContent={(x) => x.product.color} />
            </TableBody>
          </Table>
          <Text style={styles.text}>
            Date:{" "}
            {new Date(order.paymentIntent.created * 1000).toLocaleString()}
          </Text>
          <Text style={styles.text}>Order ID: {order.paymentIntent.id}</Text>
          <Text style={styles.text}>Order Status: {order.orderStatus}</Text>
          <Text style={styles.text}>
            Total Paid: {formatRupiah(order.paymentIntent.amount)}
          </Text>
          <Text style={styles.footer}>
            Thank you for shopping with TechShop!
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
