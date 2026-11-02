import qrWechat from "@/assets/qr/qr-wechat.jpg.asset.json";
import qrXiaohongshu from "@/assets/qr/qr-xiaohongshu.jpg.asset.json";
import qrDouyin from "@/assets/qr/qr-douyin.jpg.asset.json";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const WECHAT_SHOP_CODE = "#微信小店://安阳湖橄榄油/OJ3UVpxohrrvCWo";
const linkClass =
  "block text-left text-xl text-foreground hover:text-primary transition-colors duration-300";

const copyWechatShop = async () => {
  try {
    if (!navigator.clipboard) throw new Error("no clipboard");
    await navigator.clipboard.writeText(WECHAT_SHOP_CODE);
    toast.success("口令已复制，打开微信即可进入安阳湖微信小店");
  } catch {
    toast("请手动复制以下口令，打开微信即可进入安阳湖微信小店", {
      description: WECHAT_SHOP_CODE,
      duration: 15000,
    });
  }
};

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
                  <a href="tel:+8619971666999" className="text-xl text-foreground hover:text-primary transition-colors duration-300">
                    19971666999
                  </a>
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
                  {[
                    { label: "淘宝旗舰店", href: "https://shop483968118.taobao.com/category.htm?topIds=887531943185" },
                    { label: "抖音", href: "https://www.douyin.com/user/MS4wLjABAAAAWyhSjRn0cJtGJfAkcVPC_9Fmq79U69bkLghcjIr5hupPNdCRNEwNlBAAy5e9IsSV" },
                  ].map((c) => (
                    <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {c.label}
                    </a>
                  ))}
                  <button type="button" onClick={copyWechatShop} className={linkClass}>
                    微信小店
                  </button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button type="button" className={linkClass}>微信公众号</button>
                    </DialogTrigger>
                    <DialogContent className="max-w-sm text-center">
                      <DialogHeader>
                        <DialogTitle className="text-center font-serif font-light">微信扫码关注安阳湖公众号</DialogTitle>
                        <DialogDescription className="text-center">手机上可长按识别二维码</DialogDescription>
                      </DialogHeader>
                      <div className="bg-card border border-border p-3">
                        <img src={qrWechat.url} alt="安阳湖微信公众号二维码" className="w-full aspect-square object-contain" />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="pt-12 border-t border-border space-y-4 text-muted-foreground">
                <p>
                  我们为节日团购、企业福利、礼盒定制、地方特色礼品提供一站式合作方案，
                  也欢迎区域代理、商超与渠道合作伙伴洽谈。
                </p>
                <div className="grid grid-cols-3 gap-4 max-w-md pt-2">
                  {[
                    { src: qrWechat.url, label: "微信公众号" },
                    { src: qrXiaohongshu.url, label: "小红书" },
                    { src: qrDouyin.url, label: "抖音" },
                  ].map((q) => (
                    <figure key={q.label} className="text-center">
                      <div className="bg-card border border-border p-2">
                        <img src={q.src} alt={`${q.label}二维码`} loading="lazy" className="w-full aspect-square object-contain" />
                      </div>
                      <figcaption className="mt-2 text-sm text-foreground">{q.label}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
