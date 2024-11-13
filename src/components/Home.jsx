import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-primary mb-4">Welcome to Our App</h1>
      <p className="text-xl text-gray-600">
        Manage your books, contacts, recipes, and shopping all in one place
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          title="Book Collection"
          description="Manage your personal library"
          link="/books"
        />
        <FeatureCard
          title="Contact List"
          description="Keep track of your contacts"
          link="/contacts"
        />
        <FeatureCard
          title="Recipe Manager"
          description="Store your favorite recipes"
          link="/recipes"
        />
      </div>
    </div>
  );
}

function FeatureCard({ title, description, link }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link to={link} className="btn btn-primary">
        Learn More
      </Link>
    </div>
  );
}

export default Home;