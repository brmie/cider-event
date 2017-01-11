
package com.boram.cider.persistance;

import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.boram.cider.domain.EntryVO;

@Repository
public class CiderDAOImpl implements CiderDAO {
	
	@Inject
	private SqlSession session;
	public static String namespace = "com.boram.cider.mapper.pianoMapper";
	
	@Override
	public List<EntryVO> listEntry() throws Exception {
		return session.selectList(namespace + ".listEntry");
	}

	@Override
	public void insertEntry(EntryVO entry) throws Exception {
		session.insert(namespace + ".insertEntry", entry);
	}

	@Override
	public EntryVO selectEntry(int entry_no) throws Exception {
		return session.selectOne(namespace + ".selectEntry", entry_no);
	}

	@Override
	public int uniqueEmail(String entry_email) throws Exception {
		// 방금 입력한 이메일이 들어갈 수 있으면 1, 아니면 -1을 리턴
		int num = 1;
		try {
			session.selectOne(namespace + ".uniqueEmail", entry_email);
		} catch (Exception e) {
			e.printStackTrace();
			num = -1;
		}
		return num;
	}

}

