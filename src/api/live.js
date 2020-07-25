import { http } from './index';

const getLiveData = (data) => http('get', '', data);
const getLiveRoomInfo = (data) => http('get', '', data);
const getGoodInfo = (data) => http('get', '', data);

export {
	getLiveData,
	getLiveRoomInfo,
	getGoodInfo
}