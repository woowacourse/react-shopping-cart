export function isValidImageUrl(url: string): boolean {
  if (typeof url !== 'string') return false;

  const urlPattern = /^(https?:\/\/|\/\/).+/;
  const invalidExtensionPattern =
    /\.(txt|pdf|doc|docx|xls|xlsx|ppt|pptx|zip|rar|7z|exe|dll|bat|cmd|sh|ps1|vbs|js|html|css|xml|json|md|log|ini|conf|config|env|gitignore|editorconfig|prettierrc|eslintrc|babelrc|tsconfig|package|yarn|lock|toml|yaml|yml)$/i;

  return urlPattern.test(url) && !invalidExtensionPattern.test(url);
}
