import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import CollectionGrid from '../components/CollectionGrid';

const Home = () => {
    return (
        <div className="bg-bg-dark text-white">
            <Hero />
            <CollectionGrid />

            {/* Spacer or extra sections if needed */}
            <section className="px-12 py-24 flex justify-center border-t border-white/5">
                <div className="text-center max-w-2xl">
                    <p className="text-[10px] tracking-[0.5em] text-white/40 uppercase mb-8">Engineering for the concrete jungle</p>
                    <h2 className="text-5xl font-bold mb-8">THE NEXT FRONTIER OF STREETWEAR</h2>
                    <Link to="/shop" className="btn-primary inline-block">Explore Series</Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
