import ProductsList from "../components/ProductsList";

export default function ProductListPage() {
    return (
        <div className="container mx-auto flex flex-col items-center gap-6 my-10">
            <h2 className="text-4xl font-bold text-center mb-8 text-white tracking-wide font-(family-name:--font-title)">Продукты</h2>
            <ProductsList visible={'all'} />
        </div>
    );
}
