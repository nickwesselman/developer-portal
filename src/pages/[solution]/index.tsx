// Global
import { classnames } from '@/src/common/types/tailwindcss-classnames';
// Scripts
import { getPageInfo, getChildPageInfo } from '@/src/common/page-info';
import { getSolutionPaths } from '@/src/common/static-paths';
// Interfaces
import type { PageInfo, ChildPageInfo } from '@/src/interfaces/page-info';
import type { CategoryTileProps } from '@/src/components/lists/CategoryTile';
// Components
import CategoryTileList from '@/src/components/lists/CategoryTileList';
import Container from '@/src/components/common/Container';
import Layout from '@/src/layouts/Layout';
import SocialFeeds from '@/src/components/integrations/SocialFeeds';

export async function getStaticPaths() {
  const solutionPaths = await getSolutionPaths();
  let staticPaths = {
    paths: solutionPaths,
    fallback: false,
  };
  return staticPaths;
}

export async function getStaticProps(context: any) {
  const pageInfo = await getPageInfo(context.params);
  const products = await getChildPageInfo(context.params);

  return {
    props: {
      pageInfo,
      products,
    },
    revalidate: 600, // 10 minutes
  };
}

type SolutionPageProps = {
  pageInfo: PageInfo;
  products: ChildPageInfo[];
};

const SolutionPage = ({ pageInfo, products }: SolutionPageProps): JSX.Element => {
  const categoryCards = products.map((product) => ({
    ...product,
    href: product.link,
  })) as CategoryTileProps[];

  return (
    <Layout pageInfo={pageInfo}>
      <div className={classnames('py-16', 'bg-theme-bg-alt')}>
        <Container>
          <CategoryTileList cards={categoryCards} />
        </Container>
      </div>
      <Container>
        <SocialFeeds pageInfo={pageInfo} />
      </Container>
    </Layout>
  );
};

export default SolutionPage;
