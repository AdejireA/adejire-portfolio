import { Link, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import { useSeo } from "@/hooks/useSeo";

const NotFound = () => {
  const location = useLocation();
  useSeo({
    title: "Page not found",
    description: "This page doesn't exist.",
    path: location.pathname,
    noIndex: true,
  });

  return (
    <Layout>
      <section className="page-shell py-24">
        <p className="eyebrow mb-4">404 · Not found</p>
        <h1 className="text-4xl">This page isn’t here.</h1>
        <p className="mt-4 text-sm text-muted-foreground">No route matches <span className="font-mono text-foreground">{location.pathname}</span>.</p>
        <Link to="/" className="mt-7 inline-block border-b border-primary pb-1 text-sm text-foreground hover:text-primary">Back to the homepage</Link>
      </section>
    </Layout>
  );
};

export default NotFound;
