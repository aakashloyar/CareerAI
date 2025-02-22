import {authoptions} from '@/lib/auth'
import NextAuth from 'next-auth'
const handler=NextAuth(authoptions)
export {handler as GET, handler as POST}



interface Session {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface JWT {
  id: string;
  firstName: string;
  lastName: string;
}
