import { Helmet } from 'react-helmet';

interface props {
  title: string;
  descriptiton: string;
  keyword: string;
}
const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};
Meta.defaultProps = {
  title: "Welcome to Simon's Choice",
  description: 'We sell the best products for cheap',
  keywords: 'electronics, buy electronics, cheap electronics ',
};
export { Meta };
