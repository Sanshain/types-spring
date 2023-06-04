/**
 * @link https://github.com/microsoft/TypeScript/issues/17002#issuecomment-313719111
 */
interface ArrayConstructor {
    isArray(arg: any): arg is ReadonlyArray<any>
}




