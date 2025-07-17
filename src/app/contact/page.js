import { getContactPageData } from '../lib/contact';
import ContactClient from './ContactClient';

export default async function ContactPage() {
    const pageData = await getContactPageData();
    return <ContactClient pageData={pageData} />;
}