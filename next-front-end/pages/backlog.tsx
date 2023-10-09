import Head from "next/head";
import Layout from "../components/Layout";
import { cookies } from "next/headers";

export default function Backlog() {
  const cookieStore = cookies();
  const jwtToken = cookieStore.get("accessToken");
  console.log(jwtToken + " hello jwt");
  return (
    <Layout pageTitle="Backlog" privateRoute={true}>
      <></>
    </Layout>
  );
}
