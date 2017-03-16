
package com.boram.cider.persistance;

import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.boram.cider.domain.EntryVO;

@Repository
public class WinnerDAOImpl implements WinnerDAO {
	
	@Inject
	private SqlSession session;
	public static String namespace = "com.boram.cider.mapper.winnerMapper";

	@Override
	public List<EntryVO> listWinner() throws Exception {
		return session.selectList(namespace + ".listWinner");
	}

	@Override
	public void updateWinner(EntryVO entry) throws Exception {
		session.update(namespace + ".updateWinner", entry);
	}

}

