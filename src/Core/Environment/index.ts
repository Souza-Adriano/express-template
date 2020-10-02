import dotenv from 'dotenv';
type EnvVar = string | number | boolean

function getter(propertie: string, def: string): string;
function getter(propertie: string, def: number): number;
function getter(propertie: string, def: boolean): boolean;
function getter(propertie: string, def: EnvVar): EnvVar {
    if(typeof def === 'string') {
        return process.env[propertie]
            ? process.env[propertie] as string
            : def;
    }

    else if(typeof def === 'boolean') {
        return process.env[propertie]
            ? process.env[propertie] as string === 'TRUE'
            : def;
    }

    else {
        return process.env[propertie]
            ? parseInt(process.env[propertie] as string)
            : def;
    }
};

type Environment = <T>(propertie: string, def: T) => T

dotenv.config( {path: `${process.cwd()}/.env` });
export default getter as Environment;