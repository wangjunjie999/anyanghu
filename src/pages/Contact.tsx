import Navigation from "@/components/Navigation";
import Contact from "@/components/Contact";
import SEO from "@/components/SEO";

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="联系我们 · 团购合作 · 礼盒定制 · 招商咨询"
        description="联系十堰泽盟农业开发有限公司：节日团购、企业福利、安阳湖橄榄油礼盒定制、地方特色礼品与招商代理咨询。"
        path="/contact"
      />
      <Navigation />
      <div className="pt-24">
        <h1 className="sr-only">联系我们 — 团购合作 · 礼盒定制 · 招商咨询</h1>
        <Contact />
      </div>
    </div>
  );
};

export default ContactPage;
