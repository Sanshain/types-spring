import { RequiredKeys } from 'utility-types';

type Props = { req: number; reqUndef: number | undefined; opt?: string; optUndef?: number | undefined; };

// Expect: "req" | "reqUndef"
type Keys = RequiredKeys<Props>;


type User = {
    name: string;
    name1: string;
    email: string | null;
    email1: string | null;
};

type O = RequiredKeys<User>
let a: RequiredKeys<User> = 'name'  // 'name' | 'name1'