import React from "react";
import { Button, Grid, Card, Text } from "@nextui-org/react";
import { FaTwitter, FaLinkedin, FaWhatsapp, FaFacebook, FaReddit } from "react-icons/fa";

interface ShareSheetProps {
  url: string;
  title?: string;
  variant?: "cta" | "icons";
}

const socialLinks = [
  {
    name: "Twitter",
    icon: <FaTwitter color="#1DA1F2" size={20} />,
    getUrl: (url: string, title?: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title || "")}`,
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin color="#0077b5" size={20} />,
    getUrl: (url: string, title?: string) => `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title || "")}`,
  },
  {
    name: "WhatsApp",
    icon: <FaWhatsapp color="#25D366" size={20} />,
    getUrl: (url: string, title?: string) => `https://wa.me/?text=${encodeURIComponent(title ? title + " " : "")}${encodeURIComponent(url)}`,
  },
  {
    name: "Facebook",
    icon: <FaFacebook color="#4267B2" size={20} />,
    getUrl: (url: string, title?: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "Reddit",
    icon: <FaReddit color="#FF4500" size={20} />,
    getUrl: (url: string, title?: string) => `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title || "")}`,
  },
];

const ShareSheet: React.FC<ShareSheetProps> = ({ url, title, variant = "cta" }) => {
  if (variant === "icons") {
    return (
      <Grid.Container gap={1} justify="center" alignItems="center" css={{ m: 0 }}>
        {socialLinks.map(link => (
          <Grid key={link.name}>
            <Button
              auto
              light
              as="a"
              href={link.getUrl(url, title)}
              target="_blank"
              rel="noopener noreferrer"
              icon={link.icon}
              css={{ minWidth: "40px", borderRadius: "50%", boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)", background: "$background", m: 0 }}
              aria-label={`Share on ${link.name}`}
            />
          </Grid>
        ))}
      </Grid.Container>
    );
  }
  return (
    <Card css={{ mw: "600px", margin: "1.5rem auto", p: "1.5rem", borderRadius: "1rem", boxShadow: "$md", background: "$backgroundContrast" }}>
      <Card.Body>
        <Text h3 weight="bold" css={{ mb: "0.5rem", textGradient: "45deg, $blue600 -20%, $purple600 100%" }}>
          Enjoyed this post? Share it with your friends!
        </Text>
        <Text size={15} css={{ mb: "1rem", color: "$accents7" }}>
            Help others discover content like this by sharing it on your favorite social platform.
        </Text>
        <Grid.Container gap={1} justify="center" alignItems="center">
          {socialLinks.map(link => (
            <Grid key={link.name}>
              <Button
                auto
                light
                as="a"
                href={link.getUrl(url, title)}
                target="_blank"
                rel="noopener noreferrer"
                icon={link.icon}
                css={{ minWidth: "40px", borderRadius: "50%", boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)", background: "$background" }}
                aria-label={`Share on ${link.name}`}
              />
            </Grid>
          ))}
        </Grid.Container>
      </Card.Body>
    </Card>
  );
};

export default ShareSheet;
