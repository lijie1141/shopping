class SQL {

	constructor() {}

	findOneForReg (field) {
		return "SELECT `email` FROM `t_user` WHERE `email`='" + field + "'";
	}

	insertOneForReg (o) {
		return "INSERT INTO `t_user` (`email`,`nickname`,`pwd`,`phont`) VALUES ('" + o.email + "','" + o.nickname + "','" + o.pwd + "','" + o.phont + "')";
	}
}

module.exports = new SQL();