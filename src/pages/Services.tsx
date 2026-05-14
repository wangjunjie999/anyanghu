import Navigation from "@/components/Navigation";
import Services from "@/components/Services";
import SEO from "@/components/SEO";

const ServicesPage = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="产地优势 · 安阳湖橄榄油"
        description="安阳湖油橄榄基地坐落于湖北十堰秦巴山脉与汉江交汇处，好水源、好气候、好生态、好管理，孕育中国本土特级初榨橄榄油。"
        path="/services"
      />
      <Navigation />
      <div className="pt-24">
        <h1 className="sr-only">产地优势 — 安阳湖油橄榄基地</h1>
        <Services />
      </div>
    </div>
  );
};

export default ServicesPage;
