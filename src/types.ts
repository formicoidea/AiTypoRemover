export type CleanerOptions = {
	normalizeApostrophes: boolean;
	frenchApostrophes:boolean
	normalizeQuotes: boolean;
	frenchQuotes:boolean,
    inclusiveLanguage: boolean;
};

export const defaultCleanerOptions: CleanerOptions = {
	normalizeApostrophes: true,
	frenchApostrophes:false,
	normalizeQuotes: true,
	frenchQuotes:false,
    inclusiveLanguage:true,
};