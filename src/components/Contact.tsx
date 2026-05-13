const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <h2 className="text-minimal text-primary mb-4">GET IN TOUCH</h2>
              <h3 className="font-serif text-4xl md:text-6xl font-light text-architectural text-foreground mb-12">
                团购合作 · 礼盒定制
                <br />
                招商咨询
              </h3>

              <div className="space-y-8">
                <div>
                  <h4 className="text-minimal text-muted-foreground mb-2">公司</h4>
                  <p className="text-xl text-foreground">十堰泽盟农业开发有限公司</p>
                </div>
                <div>
                  <h4 className="text-minimal text-muted-foreground mb-2">品牌</h4>
                  <p className="text-xl text-foreground">安阳湖橄榄油</p>
                </div>
                <div>
                  <h4 className="text-minimal text-muted-foreground mb-2">电话</h4>
                  <p className="text-xl text-foreground">占位 · 待补充</p>
                </div>
                <div>
                  <h4 className="text-minimal text-muted-foreground mb-2">地址</h4>
                  <address className="text-xl text-foreground not-italic">
                    湖北省十堰市郧阳区
                    <br />
                    安阳湖油橄榄基地
                  </address>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div>
                <h4 className="text-minimal text-muted-foreground mb-6">电商渠道</h4>
                <div className="space-y-4">
                  {["天猫旗舰店", "京东自营", "抖音商城", "微信公众号"].map((c) => (
                    <a
                      key={c}
                      href="#"
                      className="block text-xl text-foreground hover:text-primary transition-colors duration-300"
                    >
                      {c}
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-12 border-t border-border space-y-4 text-muted-foreground">
                <p>
                  我们为节日团购、企业福利、礼盒定制、地方特色礼品提供一站式合作方案，
                  也欢迎区域代理、商超与渠道合作伙伴洽谈。
                </p>
                <p className="text-sm">二维码与电商链接将陆续上线，敬请期待。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
