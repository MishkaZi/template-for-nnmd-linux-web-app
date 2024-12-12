type Product = {
  _id: string;
  name: string;
  price: number;
};

async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch('https://node.mikezino.site/products', {
      next: { revalidate: 10 },
    });
    if (!response.ok) {
      console.error('Failed to fetch products:', response.statusText);
      throw new Error('Failed to fetch products');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}


const Home: React.FC = async () => {
  const products = await fetchProducts();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Render product list */}
        <div className="flex flex-col gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="border border-gray-300 p-4 rounded-lg shadow-sm flex flex-col items-start gap-2"
            >
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600">Price: ${product.price}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
