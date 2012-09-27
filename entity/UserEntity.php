<?php
class UserEntity extends ShakespeareEntity {
	/**
	 *  ��������Ӧ�ı�����
	 * @access public
	 * @return string
	 */
	public function get_table() {
		return 'user';
	}
	/**
	 *  ��������Ӧ���ֶ���
	 * @access public
	 * @return array
	 */
	public function get_fields() {
		return array('id', 'name', 'nickname', 'password');
	}
	/**
	 *  ��������Ӧ����Ч�ֶ���
	 * @access public
	 * @return array
	 */
	public function get_useful_fields(){
		 return array('name', 'nickname', 'password');
	}

}

