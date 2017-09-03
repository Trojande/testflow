/**
 * Created by trojande on 9/3/17.
 */
export const createReducer = (initialState: {}, actionTypesMap: {}) => (state, action) => {
  if (!actionTypesMap[action.type]) return initialState;
  return actionTypesMap[action.type](state, action);
};
export function getCookie(name: string): ?string {
  const matches = document.cookie.match(new RegExp(
        `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
    ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
export function setCookie(name: string, value: string) {
  const d = new Date();
  d.setTime(d.getTime() + 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)}; expired=${d}`;
}
