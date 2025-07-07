'use client';


export default function PageHeading({ title }) {
  return (
    <>
      <style jsx>{`
        .page-heading {
          display: inline-block;
          background-color: #06b6d4;
          border-radius: 9999px;
          padding: 0.6em 1.75em;
          transition: all 0.3s ease;
        }

        .page-title {
          color: #082f49;
          margin: 0;
          padding: 0;
          font-size: 1.15rem;
          font-weight: 600;
          line-height: 1.2;
        }
      `}</style>
      
      <div className="page-heading">
        <h1 className="page-title">{title}</h1>
      </div>
    </>
  );
}
